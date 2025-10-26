#!/bin/bash
echo "Building Docker containers..."
docker run -d -p 3000:3000 chat-cicd .
