package com.rennanprysthon.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CandidatoTest {

  @Test
  public void deveRetornar() {
    Partido partido = new Partido("13", "partido");

    Candidato candidato = new Candidato(partido, "11", "Legal");

    assertEquals("1311", candidato.getNumero());
  }
}
