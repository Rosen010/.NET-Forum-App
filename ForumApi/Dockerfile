FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ForumApi/ForumApi.csproj ForumApi/
RUN dotnet restore ForumApi/ForumApi.csproj

# Copy everything else and build
COPY ForumApi/ ForumApi/
WORKDIR /src/ForumApi
RUN dotnet publish -c Release -o /app/publish

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Set environment
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "ForumApi.dll"]