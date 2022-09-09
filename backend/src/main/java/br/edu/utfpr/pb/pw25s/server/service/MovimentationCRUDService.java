package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;
import br.edu.utfpr.pb.pw25s.server.repository.MovimentationRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MovimentationCRUDService extends IService<MovimentationDTO> {

    private final MovimentationRepository movimentationRepository;
    private final ModelMapper modelMapper;

    public MovimentationCRUDService(MovimentationRepository movimentationRepository){
        this.movimentationRepository = movimentationRepository;
        this.modelMapper = new ModelMapper();
    }
    @Override
    public List<MovimentationDTO> getAll() {
        log.info("Fetching transactions...");
        List<Movimentation> movimentations = movimentationRepository.findAll();

        return movimentations.stream()
                .map(movimentation -> modelMapper.map(movimentation, MovimentationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<MovimentationDTO> getById(Long id) {
        log.info("Trying to find desired transaction...");
        Optional<Movimentation> movimentation = movimentationRepository.findById(id);

        return Optional.of(modelMapper.map(movimentation.get(), MovimentationDTO.class));
    }

    @Override
    public MovimentationDTO add(MovimentationDTO model) {
        log.info("Adding new transaction...");
        Movimentation movimentation = movimentationRepository.save(modelMapper.map(model, Movimentation.class));

        return modelMapper.map(movimentation, MovimentationDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Movimentation> movimentation = movimentationRepository.findById(id);

        if(movimentation.isEmpty()){
            throw new ResourceNotFound("transaction by id Not found in service!");
        }
        log.info("Deleting transaction...");

        movimentationRepository.deleteById(id);
    }

    @Override
    public MovimentationDTO update(MovimentationDTO model, Long id) {
        movimentationRepository.deleteById(id);
        log.info("Updating transaction...");

        return modelMapper.map(movimentationRepository.save(modelMapper.map(model, Movimentation.class)), MovimentationDTO.class);
    }
}
