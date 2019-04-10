/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Config;

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
public class Tbl_ConfigDAO implements Serializable {

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

    public List<Tbl_ConfigDTO> getListConfig()
            throws ClassNotFoundException, SQLException {
        List<Tbl_ConfigDTO> listConfig = null;
        try {
            String sql = "Select Id, DateRefund, PriceRatio "
                    + "From tblConfig";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            rs = stm.executeQuery();
            listConfig = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                int dateRefund = rs.getInt("DateRefund");
                int priceRatio = rs.getInt("PriceRatio");

                Tbl_ConfigDTO dto = new Tbl_ConfigDTO(id, dateRefund, priceRatio);
                listConfig.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listConfig;
    }
}
