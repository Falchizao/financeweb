package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationResponse;
import br.edu.utfpr.pb.pw25s.server.service.MovimentationCRUDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movimentation")
public class MovimentationController extends IController<MovimentationResponse, ResponseEntity<?>, MovimentationRequest> {

    private final MovimentationCRUDService movimentationCRUDService;
    private final ModelMapper modelMapper;

    public MovimentationController(MovimentationCRUDService movimentationCRUDService) {
        this.movimentationCRUDService = movimentationCRUDService;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ResponseEntity<List<MovimentationResponse>> getAll() {
        List<MovimentationDTO> movimentationDTOS = movimentationCRUDService.getAll();

        return new ResponseEntity<>(movimentationDTOS.stream()
                .map(movimentationDTO -> modelMapper.map(movimentationDTO, MovimentationResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<MovimentationResponse>> getById(Long id) {
        Optional<MovimentationDTO> dto = movimentationCRUDService.getById(id);

        return new ResponseEntity<>(Optional.of(modelMapper.map(dto, MovimentationResponse.class)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MovimentationResponse> add(MovimentationRequest model) {
        MovimentationDTO dto = movimentationCRUDService.add(modelMapper.map(model, MovimentationDTO.class));

        return new ResponseEntity<>(modelMapper.map(dto, MovimentationResponse.class), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        movimentationCRUDService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<MovimentationResponse> update(MovimentationRequest model, Long id) {
        MovimentationDTO dto = movimentationCRUDService.update(modelMapper.map(model, MovimentationDTO.class), id);

        return new ResponseEntity<>(modelMapper.map(dto, MovimentationResponse.class), HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<MovimentationResponse>> findPendingTransactionsByDate(
            @RequestParam(value = "minDate", defaultValue = "") String min,
            @RequestParam(value = "maxDate", defaultValue = "") String max){

        List<MovimentationDTO> movimentationDTOS = movimentationCRUDService.findPendingTransactionByDate(min, max);

        return new ResponseEntity<>(movimentationDTOS.stream()
                .map(movimentationDTO -> modelMapper.map(movimentationDTO, MovimentationResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }


}