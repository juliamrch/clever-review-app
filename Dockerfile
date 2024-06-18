FROM node:20-slim AS builder

WORKDIR /action

# Copy only the package.json and lock file to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install

# Copy the source code and build the project
COPY src ./src
COPY tsconfig.json ./
RUN pnpm build

# Remove development dependencies
RUN rm -rf node_modules
RUN pnpm install --frozen-lockfile --prod

FROM node:20-slim AS final

RUN apt update && apt install -y git


COPY --from=builder /action/package.json /action/package.json
COPY --from=builder /action/node_modules /action/node_modules
COPY --from=builder /action/dist /action/dist

CMD ["node", "/action/dist/main.js"]
