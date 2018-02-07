package kursa4.DAO;

import kursa4.Entities.UsersEntity;

import javax.ejb.Stateful;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.*;
import java.util.List;


@Stateful
public class UsersDAO {


//    EntityManagerFactory emf = Persistence.createEntityManagerFactory("NewPersistenceUnit");
//    EntityManager em = emf.createEntityManager();

    @PersistenceContext(name="NewPersistenceUnit")
    private EntityManager em;

    public UsersDAO() {
    }

    public boolean authorization(String login , String password){
        try{
        UsersEntity usersEntity = readByLogin(login);
        if(usersEntity != null) {
            if (usersEntity.getPassword().equals(password)) {
                return true;
            }
        }
        }catch (NoResultException e){
            return false;
        }
        return false;
    }

    public boolean existsByLogin(String login){
        try {
            UsersEntity usersEntity = readByLogin(login);
            return true;
        }catch (NoResultException e){
            return false;
        }
    }

    public boolean existsByEmail(String email){
        try {
            UsersEntity usersEntity = readByEmail(email);
            return true;
        }catch (NoResultException e){
            return false;
        }
    }

    public UsersEntity readByLogin(String name){
        TypedQuery<UsersEntity> query = em.createQuery(
                "select p from UsersEntity p where p.login ='"+name+"'"
                ,UsersEntity.class);
        return query.getSingleResult();
    }

    public UsersEntity readByEmail(String email){
        TypedQuery<UsersEntity> query = em.createQuery(
                "select p from UsersEntity p where p.email ='"+email+"'"
                ,UsersEntity.class);
        return query.getSingleResult();
    }

    public List<UsersEntity> readByRating(int rating){
        TypedQuery<UsersEntity> query = em.createQuery(
                "SELECT p from UsersEntity p where p.rating ="+rating
                ,UsersEntity.class);
        return query.getResultList();
    }

    public List<UsersEntity> topTen(){
        TypedQuery<UsersEntity> query = em.createQuery(
                "SELECT p from UsersEntity  p order by p.rating desc "
                , UsersEntity.class).setMaxResults(10);
        List<UsersEntity> users = query.getResultList();
        return users;
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public UsersEntity create(UsersEntity user){
        //em.getTransaction().begin();
        em.persist(user);
       // em.getTransaction().commit();
        return user;
    }

    public UsersEntity read(int id){
        return em.find(UsersEntity.class , id);
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void update(UsersEntity user){
       // em.getTransaction().begin();
        em.merge(user);
       // em.getTransaction().commit();
   }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void delete(int id){
       // em.getTransaction().begin();
        em.remove(em.find(UsersEntity.class , id));
       // em.getTransaction().commit();
    }

    public List<UsersEntity> readAll(){
        TypedQuery<UsersEntity> query = em.createNamedQuery(
                "Users.readAll"
                ,UsersEntity.class);
        return query.getResultList();
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void deleteAll(){
      //  em.getTransaction().begin();
        Query query = em.createNamedQuery("Users.deleteAll");
        query.executeUpdate();
       // em.getTransaction().commit();
    }


    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updateFirstName(String login, String firstname){
        // em.getTransaction().begin();
        Query query = em.createQuery(
                "update UsersEntity p set p.firstname = '"+firstname+"' where p.login ='"+login+"'" );
        query.executeUpdate();
        // em.getTransaction().commit();
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updateLastName(String login, String lastname){
        // em.getTransaction().begin();
        Query query = em.createQuery(
                "update UsersEntity p set p.lastname = '"+lastname+"' where p.login ='"+login+"'" );
        query.executeUpdate();
        // em.getTransaction().commit();
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updatePassword(String login, String password){
        // em.getTransaction().begin();
        Query query = em.createQuery(
                "update UsersEntity p set p.password = '"+password+"' where p.login ='"+login+"'" );
        query.executeUpdate();
        // em.getTransaction().commit();
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updateDesc(String login, String desc){
        // em.getTransaction().begin();
        Query query = em.createQuery(
                "update UsersEntity p set p.description = '"+desc+"' where p.login ='"+login+"'" );
        query.executeUpdate();
        // em.getTransaction().commit();
    }

    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void updateEmail(String login, String email){
        // em.getTransaction().begin();
        Query query = em.createQuery(
                "update UsersEntity p set p.email = '"+email+"' where p.login ='"+login+"'" );
        query.executeUpdate();
        // em.getTransaction().commit();
    }

}
