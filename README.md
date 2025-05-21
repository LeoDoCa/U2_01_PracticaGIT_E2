# Después de clonar el repositorio:

Agregar la carpeta resources en la carpeta main dentro de src en la parte del backend (servidor)
Agregar un archivo llamado "application.properties"

Pegar los siguientes datos en dicho archivo

spring.application.name=U2_01_PracticaGIT

spring.datasource.url=jdbc:mysql://localhost:3306/dwiact?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false&createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
