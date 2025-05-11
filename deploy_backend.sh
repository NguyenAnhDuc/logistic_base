git pull origin develop
git submodule update --init --recursive
docker-compose build application 
docker-compose stop application 
docker-compose up -d application 
