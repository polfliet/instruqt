{markdown: ../common/header.md}
# Explanation
New Relic's APM agent collects data from wihin your applications.  In this challenge, we enabled the APM agent on our node.js ecommerce api application.  In this case, we have enabled distributed tracing to get a more complete view of what is happening inside our application.

Read more about New Relic APM here:
<a href ="https://docs.newrelic.com/docs/apm" target="_blank">New Relic APMM</a>

and Distributed Tracing here:
<a href="https://docs.newrelic.com/docs/understand-dependencies/distributed-tracing/get-started/introduction-distributed-tracing" target="_blank">Introduction to Distributed Tracing</a>

## Verify that the application is sending data
In New Relic One, click on "Entity Explorer", and then "Services".  Verify that you see a sevice named `newrelic-training-ecommerce-api`.