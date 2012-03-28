import os
import re

from django.core.management.base import BaseCommand, CommandError

from chess.apps.etudes.models import Etude, EtudeAuthor, RESULTS_RECOGNIZER
from chess.apps.pgnparser import pgn


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

        self.authors = EtudeAuthor.objects.all()
        self.fen_set = set(fen[0] for fen in Etude.objects.values_list('fen'))
        self.total_count = self.success_count = self.failed_count = \
                           self.duplicated_count = 0
        self.unknown_authors = set()

    def handle(self, *args, **kwargs):
        if not args:
            raise CommandError('Please specify pgn file or directory')
        pgn_file_path = args[0]
        files = self._get_file_list(pgn_file_path)

        for pgn_file in files:
            self._load_pgn_file(pgn_file)

        print "Total: %d pgn games" % self.total_count
        print "Success: %d" % self.success_count
        print "Failed: %d" % self.failed_count
        print "Unknown authors: %s" % self.unknown_authors

    def _load_pgn_file(self, pgn_file):
        pgn_source = open(pgn_file).read()
        self.etudes_bulk = []
        for game in pgn.loads(pgn_source):
            self._load_etude(game)
        Etude.objects.bulk_create(self.etudes_bulk)

    def _load_etude(self, game):
        self.total_count += 1
        if game.fen in self.fen_set:
            self.duplicated_count += 1
            return False

        authors = self._parse_authors(game.white)
        if authors:
            try:
                etude = Etude(year=self._parse_date(game.date),
                              fen=game.fen,
                              moves=game.moves_source,
                              result=self._parse_result(game.result))
                self.etudes_bulk.append(etude)
                self.success_count += 1
            except Exception, ex:
                print ex
                self.failed_count += 1
        else:
            self.failed_count += 1
            self.unknown_authors.add(game.white)

    def _parse_authors(self, token):
        if not token:
            return []
        return [a for a in self.authors \
                if re.search(a.regexp, token, flags=re.I)]

    def _parse_date(self, token):
        return int(token[0:4])

    def _parse_result(self, token):
        return RESULTS_RECOGNIZER[token]

    def _get_file_list(self, path):
        if os.path.isfile(path):
            return [path]
        elif os.path.isdir(path):
            listing_generator = os.walk(path)
            _, _, files = next(listing_generator)
            return [os.path.join(path, file_name) for file_name in files]
        else:
            raise CommandError('Invalid path argument')
