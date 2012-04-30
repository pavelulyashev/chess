import os
import re

from django.core.management.base import BaseCommand, CommandError

from chess.apps.etudes.models import Etude, Composer, RESULTS_RECOGNIZER
from chess.apps.pgnparser import pgn


class Command(BaseCommand):
    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

        self.authors = Composer.objects.all()
        self.fen_set = set(fen[0] for fen in Etude.objects.values_list('fen'))
        self.total_count = self.success_count = self.failed_count = \
                           self.duplicated_count = 0

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
        print "Duplicated: %d" % self.duplicated_count

    def _load_pgn_file(self, pgn_file):
        pgn_source = open(pgn_file).read()
        # self.etudes_bulk = []
        for game in pgn.loads(pgn_source):
            self._load_etude(game)

        # Etude.objects.bulk_create(self.etudes_bulk)
        # for etude in self.etudes_bulk:
            # etude.authors.add(*etude._authors)

    def _load_etude(self, game):
        self.total_count += 1
        if game.fen in self.fen_set:
            self.duplicated_count += 1
            print 'duplicated --->', self.total_count, game.white, game.fen
            return False

        self.fen_set.add(game.fen)
        authors = self._get_or_create_authors(game.white)
        if authors:
            try:
                etude_parameters = {
                    'fen': game.fen,
                    'event': game.event,
                    'moves': game.moves_source,
                    'result': self._parse_result(game.result, game.moves_source)
                }
                year = self._parse_date(game.date)
                try:
                    etude_parameters['year'] = int(year)
                except ValueError:
                    etude_parameters['possible_year'] = year

                etude = Etude(**etude_parameters)
                etude.save()
                etude.authors.add(*authors)
                # self.etudes_bulk.append(etude)
                self.success_count += 1
                print 'success --->', self.total_count, authors, game.fen
            except Exception, ex:
                print 'error --->', self.total_count, ex,\
                                    game.white, game.moves_source[-10:]
                self.failed_count += 1
        else:
            self.failed_count += 1
            print 'empty etude --->', self.total_count

    def _get_or_create_authors(self, token):
        if not token:
            return []

        authors = []
        for author in token.split(','):
            names = re.search('([A-Z][a-z]+) ([A-Z])', author)
            if names is not None:
                last, first = names.groups()
                author = Composer.objects.filter(last_name=last,
                                                 first_name__contains=first)
                try:
                    authors.append(author[0])
                except:
                    composer = Composer(last_name=last, first_name=first)
                    composer.save()
                    authors.append(composer)

        return authors

    def _parse_date(self, token):
        return token[0:4]

    def _parse_result(self, token, notation):
        if token == '*':
            match = re.search('(1-0|1/2-1/2|0-1)', notation)
            if match is not None:
                token = match.group()
        return RESULTS_RECOGNIZER.get(token, '*')

    def _get_file_list(self, path):
        if os.path.isfile(path):
            return [path]
        elif os.path.isdir(path):
            listing_generator = os.walk(path)
            _, _, files = next(listing_generator)
            return [os.path.join(path, file_name) for file_name in files]
        else:
            raise CommandError('Invalid path argument')
