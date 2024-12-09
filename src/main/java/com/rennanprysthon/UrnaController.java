package com.rennanprysthon;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.rennanprysthon.model.Candidato;
import com.rennanprysthon.model.Partido;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/urna")
public class UrnaController {
  private static Map<String, Partido> partidosDb;
  private static Map<Candidato, Integer> votos;

  static {
    partidosDb = new HashMap<>();
    votos = new HashMap<>();

    Partido partido1 = new Partido("01", "Partido01");
    Candidato candidato1 = new Candidato(partido1, "00", "Nome Candiadato1");
    Candidato candidato2 = new Candidato(partido1, "01", "Nome Candiadato2");

    partido1.addCandidato(candidato1);
    partido1.addCandidato(candidato2);

    partidosDb.put(partido1.getNumero(), partido1);
  }

  @GET
  @Produces(MediaType.APPLICATION_XML)
  @Path("/xml")
  public Collection<Partido> fetchXml() {
    return partidosDb.values();
  }
}
