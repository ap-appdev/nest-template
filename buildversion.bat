@echo off
SetLocal EnableDelayedExpansion
set /a c=0
for /f "UseBackQ Delims=" %%A IN ("package.json") do (
  set /a c+=1
  if !c!==3 set "a=%%A"
)

set registry_name=registry-dvs-test.hostco.ru
set docker_image_name=telemed/nest-template

if "%docker_image_name%"=="telemed/nest-template" (
  echo [91m x [0m 'buildversion.bat' is not configured. Please specify {docker_image_name} parameter above
  exit /b 1
)

echo Current version in 'package.json': [92m %a% [0m

set /P version="Enter version for build: "

set tag_name=%registry_name%/%docker_image_name%:%version%

docker build --no-cache -t %tag_name% .
if %errorlevel% neq 0 (
  echo [91m x [0m Failed to build new image
  exit /b %errorlevel%
)

docker push %tag_name%
if %errorlevel% neq 0 (
  echo [91m x [0m Failed to push image to registry
  exit /b %errorlevel%
)

echo [92m v [0m Built and pushed a new image: [92m %tag_name% [0m