package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.MovimentationResponse;
import br.edu.utfpr.pb.pw25s.server.service.MovimentationCRUDService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class MovimentationController extends IController<MovimentationResponse, ResponseEntity<?>, MovimentationRequest> {

    private final MovimentationCRUDService movimentationCRUDService;

    public MovimentationController(MovimentationCRUDService movimentationCRUDService) {
        this.movimentationCRUDService = movimentationCRUDService;
    }

    @Override
    public ResponseEntity<List<MovimentationResponse>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Optional<MovimentationResponse>> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<MovimentationResponse> add(MovimentationRequest model) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<MovimentationResponse> update(MovimentationRequest model, Long id) {
        return null;
    }
}