package com.rennanprysthon.model;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Candidato {
  private Partido partido;
  private String numero;
  private String nome;

  public Candidato() {
  }

  public Candidato(Partido partido, String numero, String nome) {
    this.partido = partido;
    this.numero = partido.getNumero() + numero;
    this.nome = nome;

    this.partido.addCandidato(this);
  }

  public Partido getPartido() {
    return partido;
  }

  public void setPartido(Partido partido) {
    this.partido = partido;
  }

  public String getNumero() {
    return numero;
  }

  public void setNumero(String numero) {
    this.numero = numero;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((numero == null) ? 0 : numero.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Candidato other = (Candidato) obj;
    if (numero == null) {
      if (other.numero != null)
        return false;
    } else if (!numero.equals(other.numero))
      return false;
    return true;
  }

}
