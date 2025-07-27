# xk6-temporal

k6 extension for testing/benchmarking Temporal.

Note: This project is still a spike. The API may change at anytime as we learn from experience.

We recommend that you use this k6 extension to load test the temporal workflows where you can start your workflows and signalling to your existing workflows to pause/stop it. 

## Usage

This extension is available compiled into k6 as docker image for use in Docker or Kubernetes setups.

## Metrics

Currently the Temporal Client that the extension creates have their metrics wired into the k6 system. This has the benefit of being visible inside the k6 infrastructure for use in k6 checks and thresholds. The downside is that these metrics cannot be scraped into Prometheus to appear in the same way that SDK metrics normally would if exported from an application. This is because k6 adds a prefix to metrics and also handles histograms differently by pre-processing them into p95 and so on, as opposed to Temporal SDK's standard behaviour of sending them on to Prometheus as it's native histogram type. We are interested in feedback for what we might improve here.

Having said all that, if you do have Prometheus setup we recommend that you send the k6 metrics to your Prometheus instance to more easily tie k6 results to changes in Temporal metrics. 

Note: Your prometheus instance will need to have remote write enabled for the metrics to be receieved, this is often not enabled by default.
