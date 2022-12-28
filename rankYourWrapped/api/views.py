from django.shortcuts import render
from rest_framework import generics, status
from .serializers import LeaderboardEntrySerializer
from .models import LeaderboardEntry

from rest_framework.views import APIView
from rest_framework.response import Response

class LeaderboardEntryView(generics.ListAPIView):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer

