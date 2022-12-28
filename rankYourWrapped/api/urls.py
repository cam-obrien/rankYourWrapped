from django.urls import path
from .views import LeaderboardEntryView

urlpatterns = [
    path('leaderboard_entries', LeaderboardEntryView.as_view())
]