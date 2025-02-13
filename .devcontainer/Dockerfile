FROM node:20

RUN npm install typescript nx -g
RUN npm install npx -g --force

WORKDIR /bible

COPY ./.gitconfig /root/.gitconfig
COPY ./.ssh /root/.ssh
RUN chmod 600 -R /root/.ssh
RUN ssh-add -D && ssh-add /root/.ssh/id_ed25519 || true

# Teclado português com horário brasileiro
ENV LANG=C.UTF-8
ENV LANGUAGE=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV TZ=America/Sao_Paulo
ENV DEBUG_COLORS=true
ENV FORCE_COLOR=true

# The run the start script
CMD [ "/bin/bash" ]
