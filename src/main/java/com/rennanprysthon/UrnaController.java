package com.rennanprysthon;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.rennanprysthon.model.Candidato;
import com.rennanprysthon.model.Partido;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/urna")
public class UrnaController {
  private static Map<String, Partido> partidosDb;
  private static Map<String, Candidato> candidatesDb;
  private static Map<Candidato, Integer> votos;

  static {
    partidosDb = new HashMap<>();
    votos = new HashMap<>();
    candidatesDb = new HashMap<>();

    Partido partido1 = new Partido("01", "Partido01");
    Partido partido2 = new Partido("02", "Partido02");
    Partido partido3 = new Partido("03", "Partido03");
    Partido partido4 = new Partido("04", "Partido04");

    Candidato candidato1 = new Candidato(partido1, "00", "Nome Candiadato1");
    Candidato candidato2 = new Candidato(partido1, "01", "Nome Candiadato2");

    partido1.addCandidato(candidato1);
    partido1.addCandidato(candidato2);

    partidosDb.put(partido1.getNumero(), partido1);
    partidosDb.put(partido2.getNumero(), partido2);
    partidosDb.put(partido3.getNumero(), partido3);
    partidosDb.put(partido4.getNumero(), partido4);

    candidatesDb.put(candidato1.getNumero(), candidato1);
    candidatesDb.put(candidato2.getNumero(), candidato2);
  }

  @GET
  @Produces(MediaType.APPLICATION_XML)
  public Collection<Partido> fetchXml() {
    return partidosDb.values();
  }

  @GET
  @Produces(MediaType.APPLICATION_XML)
  @Path("/candidate/{candidateNumber}")
  public CandidatoResponse recuperarCandidatoPeloNumero(
      @PathParam("candidateNumber") String candidateNumber) {

    Candidato candidato = candidatesDb.get(candidateNumber);

    if (candidato == null) {
      return new CandidatoResponse(null, false);
    }

    return new CandidatoResponse(candidato, true);
  }
}
