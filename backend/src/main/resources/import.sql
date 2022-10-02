INSERT INTO tb_user(username,display_Name,password) VALUES ('Falchi', 'Falchi', '12345');
INSERT INTO tb_user(username,display_Name,password) VALUES ('Pegorini', 'Pegorini', '1234');
INSERT INTO tb_user(username,display_Name,password) VALUES ('Ricardo', 'Braga','123456');
INSERT INTO tb_user(username,display_Name,password) VALUES ('Solares', 'Solares','1234567');

INSERT INTO tb_category(name) VALUES ('Eletricidade');
INSERT INTO tb_category(name) VALUES ('Mercado');
INSERT INTO tb_category(name) VALUES ('Domestica');
INSERT INTO tb_category(name) VALUES ('Carro');
INSERT INTO tb_category(name) VALUES ('Pensao');

INSERT INTO tb_account(bank, bank_branch, code, type, user_id) VALUES ('Banco do Brasil', '51054' , '001' , 1, 1);
INSERT INTO tb_account(bank, bank_branch, code, type, user_id) VALUES ('Caixa Economica', '32051' , '277' , 2, 2);
INSERT INTO tb_account(bank, bank_branch, code, type, user_id) VALUES ('Santander', '31021' , '196' , 2, 3);
INSERT INTO tb_account(bank, bank_branch, code, type, user_id) VALUES ('Bradesco', '23054' , '553' , 1, 4);

INSERT INTO tb_movimentation(description, due_date, paid_value, payment_date, type, value, account_id, category_id) VALUES ('Please God', '2022-01-01 00:00:00' , 0 , '2022-08-01 00:00:00', 1, 300, 1, 2);
INSERT INTO tb_movimentation(description, due_date, paid_value, payment_date, type, value, account_id, category_id) VALUES ('Ave Maria', '2022-05-01 00:00:00' , 0 , '2022-09-01 00:00:00', 1, 400, 2, 1);
INSERT INTO tb_movimentation(description, due_date, paid_value, payment_date, type, value, account_id, category_id) VALUES ('Paguei', '2022-08-01 00:00:00', 500 , '2022-10-01 00:00:00', 1, 500, 3, 3);