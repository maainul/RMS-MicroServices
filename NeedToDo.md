

## Log Features and Improvements

1. Add daily rotation using winston-daily-rotate-file

2. Send logs to centralized log manager (e.g., LogDNA, ELK Stack, or Grafana Loki)

3. Use logger.child({ service: 'order-service' }) for multi-service logs