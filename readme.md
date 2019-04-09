# Docker

## Containers, Hosts and IPs

Host refers to your machine, container is, well, the docker container. Through docker compose's ports variable you can defined port mappings between the containers and host. 

```yaml
db:
  ports:
    - 5431:5432
```

This maps the right hand port of the container, to the host on 5431. Therefore, on your host machine you could access the container using `localhost:5431`. However, from within another container, you would have to access the container port using `db:5432`, as this is the containers internal network name. 