#!/bin/bash
docker run --network="apps_default" --rm redis redis-cli -h redis info