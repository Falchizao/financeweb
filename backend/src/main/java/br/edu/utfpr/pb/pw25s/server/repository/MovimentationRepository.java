package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.generic.IRepository;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;

public interface MovimentationRepository extends IRepository<Movimentation> {
    Movimentation findBydescription(String description);
}
