package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import br.edu.utfpr.pb.pw25s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.handler.exceptions.ObjectInsertionConflictException;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AccountCRUDService extends IService<AccountDTO> {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;
    private final UserCRUDService userCRUDService;

    public AccountCRUDService(AccountRepository accountRepository, UserCRUDService userCRUDService){
        this.accountRepository = accountRepository;
        this.modelMapper = new ModelMapper();
        this.userCRUDService = userCRUDService;

    }
    @Override
    public List<AccountDTO> getAll(String username) {
        log.info("Fetching accounts...");
        List<Account> accounts = accountRepository.findByUsername(username);

        return accounts.stream()
                .map(account -> modelMapper.map(account, AccountDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AccountDTO> getById(Long id) {
        log.info("Trying to find desired account...");
        Optional<Account> account = accountRepository.findById(id);

        return Optional.of(modelMapper.map(account.get(), AccountDTO.class));
    }

    @Override
    public AccountDTO add(AccountDTO model) {

        try{
            Optional<UserDTO> user = userCRUDService.getByName(model.getUser().getUsername());
            model.setUser(modelMapper.map(user, User.class));
        }catch(Exception e){
            throw new ObjectInsertionConflictException("Dados do usuário inválidos, favor verificar!");
        }

        log.info("Adding new account...");
        Account account = accountRepository.save(modelMapper.map(model, Account.class));
        return modelMapper.map(account, AccountDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Account> account = accountRepository.findById(id);

        if(account.isEmpty()){
            throw new ResourceNotFound("Account by id Not found in service!");
        }
        log.info("Deleting account...");

        accountRepository.deleteById(id);
    }

    @Override
    public AccountDTO update(AccountDTO model, Long id) {
        accountRepository.deleteById(id);
        log.info("Updating account...");

        return modelMapper.map(accountRepository.save(modelMapper.map(model, Account.class)), AccountDTO.class);
    }

    public Account findByIdentificators(String bank, String agency, Long code){
        return accountRepository.findByIdentificators(bank, agency, code);
    }
}
