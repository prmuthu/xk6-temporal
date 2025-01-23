FROM golang:1.22.7 AS builder

WORKDIR /usr/src/k6

RUN go install go.k6.io/xk6/cmd/xk6@latest

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN xk6 build --output /usr/local/bin/k6 \
--with github.com/prmuthu/xk6-temporal@v0.1.0=.

FROM alpine:3.16

WORKDIR /opt/k6

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/local/bin/k6 /usr/local/bin/k6
COPY ./examples /opt/k6/examples

CMD ["k6"]
