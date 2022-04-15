FROM registry-dvs-test.hostco.ru/node:14.17.3 As build

RUN mkdir /build
WORKDIR /build

COPY src ./src
COPY package.json .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN npm install
RUN npm run test
RUN npm run build

# Выбрал alpine для production, т.к.:
# node - 1.03GB
# slim - 257.92MB
# alpine - 207.49MB
FROM registry-dvs-test.hostco.ru/node:14.17.3-alpine


ENV NODE_ENV production


RUN mkdir /app
WORKDIR /app

COPY --from=build ./build/dist ./dist
COPY --from=build ./build/package.json ./package.json

RUN npm install --production

CMD [ "npm", "run", "start:prod"]