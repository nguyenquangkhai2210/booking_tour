/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Category;

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
public class Tbl_CategoryDAO implements Serializable {
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
    
    public List<Tbl_CategoryDTO> getListCategory() 
            throws ClassNotFoundException, SQLException{
        List<Tbl_CategoryDTO> listCategory = null;
        try {
            String sql = "Select Id, Name, Description, UrlImage " 
                    + "From tblCategory " 
                    + "Where Status = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, "activity");
            rs = stm.executeQuery();
            listCategory = new ArrayList<>();
            
            while(rs.next()){
                int id = rs.getInt("Id");
                String name = rs.getString("Name");
                String description = rs.getString("Description");
                String urlImage = rs.getString("UrlImage");
                Tbl_CategoryDTO dto = new Tbl_CategoryDTO(id, name, description, "activity", urlImage);
                listCategory.add(dto);
            }
        } finally {
            closeConnection();
        }
        return listCategory;
    }
    
    public boolean updateCategory(int id, String name, String description, String urlImage) 
            throws ClassNotFoundException, SQLException {
        boolean check = false;
        try {
            String sql = "Update tblCategory "
                    + "Set Name = ?, Description = ?, UrlImage = ? "
                    + "Where Id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, name);
            stm.setString(2, description);
            stm.setString(3, urlImage);
            stm.setInt(4, id);

            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }
        return check;
    }

    public boolean insertCategory(String name, String description, String urlImage)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Insert into "
                    + "tblCategory (Name, Description, Status, UrlImage) "
                    + "Values(?, ?, ?, ?)";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, name);
            stm.setString(2, description);
            stm.setString(3, "activity");
            stm.setString(4, urlImage);
            
            int row = stm.executeUpdate();
            if (row > 0) {
                check = true;
            }
        } finally {
            closeConnection();
        }

        return check;
    }

    public boolean deleteCategory(int id)
            throws SQLException, ClassNotFoundException {
        boolean check = false;
        try {
            String sql = "Update tblCategory "
                    + "Set Status = ? "
                    + "Where id = ?";
            con = MyConnection.getConnection();
            stm = con.prepareStatement(sql);
            stm.setString(1, "isDelete");
            stm.setInt(2, id);

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
