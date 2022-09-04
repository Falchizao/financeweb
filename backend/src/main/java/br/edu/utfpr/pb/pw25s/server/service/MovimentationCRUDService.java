package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MovimentationCRUDService extends IService<MovimentationDTO> {
    @Override
    public List<MovimentationDTO> getAll() {
        return null;
    }

    @Override
    public Optional<MovimentationDTO> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public MovimentationDTO add(MovimentationDTO model) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public MovimentationDTO update(MovimentationDTO model, Long id) {
        return null;
    }
}
