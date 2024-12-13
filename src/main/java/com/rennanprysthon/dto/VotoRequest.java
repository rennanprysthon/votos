package com.rennanprysthon.dto;

import com.rennanprysthon.model.Candidato;

public class VotoRequest {
  private Candidato candidate;
  private VoteType type;

  public Candidato getCandidate() {
    return candidate;
  }

  public void setCandidate(Candidato candidate) {
    this.candidate = candidate;
  }

  public VoteType getType() {
    return type;
  }

  public void setType(VoteType type) {
    this.type = type;
  }

  @Override
  public String toString() {
    return "VotoRequest [candidate=" + candidate + ", type=" + type + "]";
  }
}
