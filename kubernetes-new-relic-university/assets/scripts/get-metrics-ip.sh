#!/usr/bin/env bash

POD_NAME=$(kubectl get pods --all-namespaces | grep kube-state-metrics | awk '{print $2}')
POD_IP=$(kubectl describe pod -n kube-system $POD_NAME | grep IP | awk '{print $2}')

echo "Kube-state-metrics IP: $POD_IP"
