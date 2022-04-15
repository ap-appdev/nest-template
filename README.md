# nest-template

Проект-шаблон для ускорения процесса создания новых NestJS-проектов.

После применения данного шаблона, его необходимо донастроить под нужды конкретного сервиса, отредактировав по необходимости файлы:

- README.md
- package.json
- Dockerfile
- docker-compose.yaml
- buildversion.bat

(Для базового редактирования шаблона, необходимо лишь сделать глобальный поиск по проекту словосочетания nest-template, и заменить все вхождения на название вашего сервиса)

Проект конфигурируется за счёт файла .env, который должен находится в корне проекта

## Настройки в .env

```

# Режим запуска приложения
NODE_ENV=development

# максимальный размер файла лога (по умолчанию 100m)
LOG_MAX_SIZE_FILE=100m

# Порт приложения
PORT=3000

# Часовой пояс
UTC_OFFSET=+05:00

```
