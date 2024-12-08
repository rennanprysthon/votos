package com.rennanprysthon;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/urna")
public class UrnaController {

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String helloWorld() {
    return "";
  }
}
