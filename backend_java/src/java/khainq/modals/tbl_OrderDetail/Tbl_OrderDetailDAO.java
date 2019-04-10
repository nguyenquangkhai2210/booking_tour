/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_OrderDetail;

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
public class Tbl_OrderDetailDAO implements Serializable {

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

    public List<Tbl_OrderDetailDTO> getListOrderDetail(int orderId)
            throws ClassNotFoundException, SQLException {
        List<Tbl_OrderDetailDTO> listOrderDetail = null;
        try {
            String sql = "Select Id, TourId, Quantity, Price "
                    + "From tblOrderDetail "
                    + "Where OrderId = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, orderId);
            rs = stm.executeQuery();
            listOrderDetail = new ArrayList<>();

            while (rs.next()) {
                int id = rs.getInt("Id");
                int tourId = rs.getInt("TourId");
                int quantity = rs.getInt("Quantity");
                int price = rs.getInt("Price");

                Tbl_OrderDetailDTO dto = new Tbl_OrderDetailDTO(id, orderId, tourId, quantity, price);
                listOrderDetail.add(dto);
            }
        } finally {
            closeConnection();
        }

        return listOrderDetail;
    }

    public boolean insertOrder(int orderId,
            int tourId,
            int quantity,
            float price)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Insert into "
                    + "tblOrderDetail (OrderId, TourId, Quantity, Price) "
                    + "Values(?, ?, ?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, orderId);
            stm.setInt(2, tourId);
            stm.setInt(3, quantity);
            stm.setFloat(4, price);

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
