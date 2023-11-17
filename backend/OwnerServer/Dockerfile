FROM openjdk:17-oracle

COPY ./build/libs/OwnerServer-0.0.1-SNAPSHOT.jar app.jar

ARG ENVIRONMENT

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "app.jar"]
