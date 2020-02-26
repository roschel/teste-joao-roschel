docker image build -t alphaproject:1.0 .
docker run --name alphaproject -d -p 5432:5432 alphaproject:1.0

