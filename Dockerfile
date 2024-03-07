FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

ARG PORT
ENV PORT $PORT

RUN pnpm install

EXPOSE $PORT/tcp

CMD [ "pnpm", "start" ]
