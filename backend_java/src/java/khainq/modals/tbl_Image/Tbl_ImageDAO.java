/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Image;

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
public class Tbl_ImageDAO implements Serializable {
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
    
    public List<Tbl_ImageDTO> getListImage(int tourId) 
            throws ClassNotFoundException, SQLException{
        List<Tbl_ImageDTO> listImage = null;
        try {
            String sql = "Select Url " 
                    + "From tblImage " 
                    + "Where TourId = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, tourId);
            rs = stm.executeQuery();
            listImage = new ArrayList<>();
            
            while(rs.next()){
                String url = rs.getString("Url");
                Tbl_ImageDTO dto = new Tbl_ImageDTO(url, tourId);
                listImage.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listImage;
    }
    
    public Tbl_ImageDTO getOneImage(int tourId) 
            throws ClassNotFoundException, SQLException{
        Tbl_ImageDTO image = null;
        try {
            String sql = "Select Url " 
                    + "From tblImage " 
                    + "Where TourId = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, tourId);
            rs = stm.executeQuery();
            
            if(rs.next()){
                String url = rs.getString("Url");
                image = new Tbl_ImageDTO(url, tourId);
            }
        } finally {
            closeConnection();
        }
        return image;
    }

    public boolean insertImage(String url, int TourId)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Insert into "
                    + "tblImage (Url, TourId) "
                    + "Values(?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, url);
            stm.setInt(2, TourId);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }

        return check;
    }
    
    public boolean deleteImage(int TourId)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Delete "
                    + "From tblImage "
                    + "Where TourId = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setInt(1, TourId);

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
