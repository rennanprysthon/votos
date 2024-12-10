package com.rennanprysthon;

import com.rennanprysthon.model.Candidato;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CandidatoResponse {
  private Candidato candidato;
  private Boolean encontrou;

  public CandidatoResponse() {
  }

  public CandidatoResponse(Candidato candidato, Boolean encontrou) {
    this.candidato = candidato;
    this.encontrou = encontrou;
  }

  public Candidato getCandidato() {
    return candidato;
  }

  public void setCandidato(Candidato candidato) {
    this.candidato = candidato;
  }

  public Boolean getEncontrou() {
    return encontrou;
  }

  public void setEncontrou(Boolean encontrou) {
    this.encontrou = encontrou;
  }
}
