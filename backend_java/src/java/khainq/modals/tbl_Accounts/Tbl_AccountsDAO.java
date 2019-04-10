/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Accounts;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import khainq.utils.MyConnection;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_AccountsDAO implements Serializable {

    private Connection con;
    private PreparedStatement stm;
    private ResultSet rs;

    private void closeConnection()
            throws ClassNotFoundException, SQLException {
        if (rs != null) {
            rs.close();
        }
        if (stm != null) {
            stm.close();
        }
        if (con != null) {
            con.close();
        }
    }

    public String checkLogin(String username, String password)
            throws SQLException, ClassNotFoundException {
        String role = null;

        try {
            String sql = "Select Username, Password, Role From tblAccounts "
                    + "Where Username = ? and Password = ? and Status = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, username);
            stm.setString(2, password);
            stm.setString(3, "activity");
            rs = stm.executeQuery();
            if (rs.next()) {
                if (username.equals(rs.getString("Username"))
                        && password.equals(rs.getString("Password"))) {
                    role = rs.getString("Role");
                }
            }
        } finally {
            closeConnection();
        }

        return role;
    }

    public List<Tbl_AccountsDTO> listAccountWithStatus(String status)
            throws SQLException, ClassNotFoundException {
        List<Tbl_AccountsDTO> listAccount = null;
        try {
            String sql = "Select "
                    + "Username, Name, Gender, Email "
                    + "From tblAccounts "
                    + "Where Status = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, status);
            rs = stm.executeQuery();
            listAccount = new ArrayList<>();

            while (rs.next()) {
                String username = rs.getString("Username");
                String name = rs.getString("Name");
                boolean gender = rs.getBoolean("Gender");
                String email = rs.getString("Email");

                Tbl_AccountsDTO dto = new Tbl_AccountsDTO();
                dto.setUsername(username);
                dto.setName(name);
                dto.setGender(gender);
                dto.setEmail(email);
                listAccount.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listAccount;
    }

    public Tbl_AccountsDTO viewAccountDetail(String username)
            throws SQLException, ClassNotFoundException {
        Tbl_AccountsDTO dto = null;

        try {
            String sql = "Select "
                    + "Name, Gender, BirthDate, "
                    + "Email, Address "
                    + "From tblAccounts "
                    + "Where Username = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, username);
            rs = stm.executeQuery();
            if (rs.next()) {
                String name = rs.getString("Name");
                boolean gender = rs.getBoolean("Gender");
                String birthdate = rs.getString("BirthDate");
                String email = rs.getString("Email");
                String address = rs.getString("Address");
                
                dto = new Tbl_AccountsDTO();
                dto.setName(name);
                dto.setGender(gender);
                dto.setBirthDate(birthdate);
                dto.setEmail(email);
                dto.setAddress(address);
            }
        } finally {
            closeConnection();
        }

        return dto;
    }

    public boolean createAccount(Tbl_AccountsDTO dto)
            throws SQLException, ClassNotFoundException {
        boolean check = false;

        try {
            String sql = "Insert Into tblAccounts "
                    + "(Username, Password, Email, Role, Status) "
                    + "Values(?, ?, ?, ?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, dto.getUsername());
            stm.setString(2, dto.getPassword());
            stm.setString(3, dto.getEmail());
            stm.setString(4, "user");
            stm.setString(5, "activity");

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }

    public boolean updateAccount(Tbl_AccountsDTO dto)
            throws SQLException, ClassNotFoundException {
        boolean check = false;

        try {
            String sql = "Update tblAccounts "
                    + "Set Name = ?, Gender = ?, BirthDate = ?, "
                    + "Email = ?, Address = ? "
                    + "Where Username = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, dto.getName());
            System.out.println(dto.getName());
            stm.setBoolean(2, dto.isGender());
            stm.setString(3, dto.getBirthDate());
            stm.setString(4, dto.getEmail());
            stm.setString(5, dto.getAddress());
            stm.setString(6, dto.getUsername());

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }

    public boolean changePassword(String username, String oldPassword, String newPassword)
            throws SQLException, ClassNotFoundException {
        boolean check = false;

        try {
            String sql = "Update tblAccounts "
                    + "Set Password = ? "
                    + "Where Username = ? and Password = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, newPassword);
            stm.setString(2, username);
            stm.setString(3, oldPassword);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }

        return check;
    }

    public boolean deleteAccount(String username)
            throws SQLException, ClassNotFoundException {
        boolean check = false;

        try {
            String sql = "Update tblAccounts "
                    + "Set Status = 'deleted' "
                    + "Where Username = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, username);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }

}
