package com.rennanprysthon.model;

import java.util.HashMap;
import java.util.Map;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Partido {
  private String numero;
  private String nome;
  private Map<String, Candidato> candidatos;

  public Partido() {
    this.candidatos = new HashMap<>();
  }

  public Partido(String numero, String nome) {
    this.numero = numero;
    this.nome = nome;
    this.candidatos = new HashMap<>();
  }

  public String getNumero() {
    return numero;
  }

  public void addCandidato(Candidato candidato) {
    this.candidatos.put(candidato.getNumero(), candidato);
  }

  public void setNumero(String numeroPartido) {
    if (numeroPartido == null) {
      throw new IllegalArgumentException("Numero invalido");
    }

    if (!numeroPartido.matches("\\d{2}")) {
      throw new IllegalArgumentException("Numero invalido de partido");
    }

    this.numero = numeroPartido;
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
    Partido other = (Partido) obj;
    if (numero == null) {
      if (other.numero != null)
        return false;
    } else if (!numero.equals(other.numero))
      return false;
    return true;
  }

}
