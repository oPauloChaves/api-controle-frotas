FROM node:7.9

# if left blank app will run with dev settings
# to build production image run:
# $ docker build ./frontend --build-args app_env=production
ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV NODE_ENV $app_env

# Install node_modules with Yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p /api && cd /api && ln -s /tmp/node_modules

WORKDIR /api
COPY ./ /api

EXPOSE 8080

CMD if [ ${NODE_ENV} = production ]; \
	then \
	yarn start; \
	else \
	yarn run dev; \
	fi

