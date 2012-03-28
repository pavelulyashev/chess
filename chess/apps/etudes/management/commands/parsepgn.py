import os

from django.core.management.base import BaseCommand, CommandError

from chess.apps.etudes import Etude, EtudeAuthor
from chess.apps.pgnparser import pgn


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for pgn_file_name in args:
            try:
                pgn_source = open(pgn_file_name).read()
                games = pgn.loads(pgn_source)
                for game in games:
                    self._load_etude(game)
            except:
                pass

    def _load_etude(self, game):
        author = game.white
        print author
        print CommandError, EtudeAuthor, Etude

    def _get_file_list(self, filelist):
        files = []
        for filename in filelist:
            if os.path.isdir(filename):
                for _, _, flist in os.walk(filename):
                    files.extend(flist)
            else:
                files.append(filename)
        return files
