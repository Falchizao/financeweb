package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.AccountResponse;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.AccountRequest;
import br.edu.utfpr.pb.pw25s.server.service.AccountCRUDService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/category")
public class AccountController extends IController<AccountResponse, ResponseEntity<?>, AccountRequest> {

    private final AccountCRUDService accountCRUDService;

    public AccountController(AccountCRUDService accountCRUDService) {
        this.accountCRUDService = accountCRUDService;
    }

    @Override
    public ResponseEntity<List<AccountResponse>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Optional<AccountResponse>> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<AccountResponse> add(AccountRequest model) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<AccountResponse> update(AccountRequest model, Long id) {
        return null;
    }
}
