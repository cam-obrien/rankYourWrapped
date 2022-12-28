from django.db import models

def sort_leaderboard():
    pass
    
    #if LeaderboardEntry.objects.

# Create your models here.
class LeaderboardEntry(models.Model):
    first_name = models.CharField(max_length=20, default="")
    last_name = models.CharField(max_length=20, default="")
    username = models.CharField(max_length=20, unique=True, default="N/A")
    score = models.IntegerField(default=0)


