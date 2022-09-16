package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.MovimentationDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationResponse;
import br.edu.utfpr.pb.pw25s.server.service.MovimentationCRUDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Optional<MovimentationResponse>> getById(@PathVariable Long id) {
        Optional<MovimentationDTO> dto = movimentationCRUDService.getById(id);

        return new ResponseEntity<>(Optional.of(modelMapper.map(dto, MovimentationResponse.class)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<MovimentationResponse> add(@RequestBody MovimentationRequest model) {
        MovimentationDTO dto = movimentationCRUDService.add(modelMapper.map(model, MovimentationDTO.class));

        return new ResponseEntity<>(modelMapper.map(dto, MovimentationResponse.class), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable Long id) {
        movimentationCRUDService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<MovimentationResponse> update(@RequestBody MovimentationRequest model, @PathVariable Long id) {
        MovimentationDTO dto = movimentationCRUDService.update(modelMapper.map(model, MovimentationDTO.class), id);

        return new ResponseEntity<>(modelMapper.map(dto, MovimentationResponse.class), HttpStatus.OK);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<MovimentationResponse>> findPendingTransactionsByDate(@RequestParam(value = "minDate", defaultValue = "") String min, @RequestParam(value = "maxDate", defaultValue = "") String max){
        List<MovimentationDTO> movDTO = movimentationCRUDService.findPendingTransactionByDate(min, max);

        return new ResponseEntity<>(movDTO.stream()
                .map(dto -> modelMapper.map(dto, MovimentationResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }
}