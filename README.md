# nest-template

Проект-шаблон для ускорения процесса создания новых NestJS-проектов.

После применения данного шаблона, его необходимо донастроить под нужды конкретного сервиса, отредактировав по необходимости файлы:

- README.md
- package.json
- Dockerfile
- docker-compose.yaml
- buildversion.bat

(Для базового редактирования шаблона, необходимо лишь сделать глобальный поиск по проекту словосочетания nest-template, и заменить все вхождения на название вашего сервиса)

Проект конфигурируется за счёт файла configuration.yml, который должен находится в корне проекта

## Настройки в configuration.yml

```

# Режим запуска приложения
NODE_ENV: development

# Порт приложения
PORT: 3000

# Часовой пояс
UTC_OFFSET: +05:00

```
