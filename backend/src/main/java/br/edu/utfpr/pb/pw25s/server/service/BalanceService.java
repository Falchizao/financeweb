package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
public class BalanceService {

    private final AccountCRUDService accountCRUDService;

    public BalanceService(AccountCRUDService accountCRUDService){
        this.accountCRUDService = accountCRUDService;
    }

    public void attBalance(BigDecimal value, AccountDTO account){
        account.setBalance(value);
        accountCRUDService.update(account, account.getId());
    }
}
