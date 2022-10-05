package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.AccountResponse;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.AccountRequest;
import br.edu.utfpr.pb.pw25s.server.service.AccountCRUDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/account")
public class AccountController extends IController<AccountResponse, ResponseEntity<?>, AccountRequest> {

    private final AccountCRUDService accountCRUDService;
    private final ModelMapper modelMapper;

    public AccountController(AccountCRUDService accountCRUDService) {
        this.accountCRUDService = accountCRUDService;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ResponseEntity<List<AccountResponse>> getAll(HttpServletRequest httpServletRequest) {
        List<AccountDTO> accountList = accountCRUDService.getAll(httpServletRequest.getUserPrincipal().getName());

        return new ResponseEntity<>(accountList.stream()
                .map(accountDTO -> modelMapper.map(accountDTO, AccountResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<AccountResponse>> getById(@PathVariable Long id) {
        Optional<AccountDTO> dto = accountCRUDService.getById(id);

        return new ResponseEntity<>(Optional.of(modelMapper.map(dto, AccountResponse.class)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AccountResponse> add(@Valid @RequestBody AccountRequest model) {
        AccountDTO dto = accountCRUDService.add(modelMapper.map(model, AccountDTO.class));

        return new ResponseEntity<>(modelMapper.map(dto, AccountResponse.class), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable Long id) {
        accountCRUDService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<AccountResponse> update(@Valid @RequestBody AccountRequest model, @PathVariable Long id) {
        AccountDTO dto = accountCRUDService.update(modelMapper.map(model, AccountDTO.class), id);

        return new ResponseEntity<>(modelMapper.map(dto, AccountResponse.class), HttpStatus.OK);
    }
}
