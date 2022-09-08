package cat.tecnocampus.sample.repository;

import cat.tecnocampus.sample.domain.Player;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Player entity.
 */
@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    default Optional<Player> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Player> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Player> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct player from Player player left join fetch player.team",
        countQuery = "select count(distinct player) from Player player"
    )
    Page<Player> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct player from Player player left join fetch player.team")
    List<Player> findAllWithToOneRelationships();

    @Query("select player from Player player left join fetch player.team where player.id =:id")
    Optional<Player> findOneWithToOneRelationships(@Param("id") Long id);
}
