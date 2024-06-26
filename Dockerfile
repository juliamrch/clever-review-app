FROM node:20-slim AS builder

WORKDIR /action

# Copy only the package.json and lock file to leverage Docker cache
COPY package.json package-lock.json ./

RUN corepack enable
RUN npm install

# Copy the source code and build the project
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# Remove development dependencies
RUN rm -rf node_modules
RUN npm install

FROM node:20-slim AS final

RUN apt update && apt install -y git


COPY --from=builder /action/package.json /action/package.json
COPY --from=builder /action/node_modules /action/node_modules
COPY --from=builder /action/dist /action/dist

CMD ["node", "/action/dist/main.mjs"]
