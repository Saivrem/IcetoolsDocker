FROM adoptopenjdk/openjdk11

COPY java/icedata.jar /opt/

RUN chmod 770 /opt/icedata.jar

ENTRYPOINT ["java","-jar","/opt/icedata.jar"]
